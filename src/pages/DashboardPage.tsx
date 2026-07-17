import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import type { College, Canteen, User, Order } from '../types';
import StatCard from '../components/StatCard';
import { Building2, Store, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [colRes, cantRes, userRes] = await Promise.allSettled([
        api.colleges.list(),
        api.canteens.list(),
        api.users.list(),
      ]);
      const collegeData = colRes.status === 'fulfilled' ? (colRes.value as College[]) : [];
      const canteenData = cantRes.status === 'fulfilled' ? (cantRes.value as Canteen[]) : [];
      const userData = userRes.status === 'fulfilled' ? (userRes.value as User[]) : [];

      setColleges(Array.isArray(collegeData) ? collegeData : []);
      setCanteens(Array.isArray(canteenData) ? canteenData : []);
      setUsers(Array.isArray(userData) ? userData : []);

      const allOrders: Order[] = [];
      for (const c of Array.isArray(canteenData) ? canteenData : []) {
        try {
          const data = await api.canteenData.get(c.id);
          if (data?.orders && Array.isArray(data.orders)) {
            allOrders.push(...(data.orders as Order[]));
          }
        } catch {
          // skip canteen on error
        }
      }
      setOrders(allOrders);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const recentOrders = [...orders].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Overview of your canteen management platform</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-violet-300 border-t-violet-600 rounded-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard label="Colleges" value={colleges.length} icon={Building2} color="violet" />
            <StatCard label="Canteens" value={canteens.length} icon={Store} color="blue" />
            <StatCard label="Users" value={users.length} icon={Users} color="green" />
            <StatCard label="Total Orders" value={orders.length} icon={ShoppingCart} color="orange" />
            <StatCard
              label="Total Revenue"
              value={`₹${totalRevenue.toLocaleString()}`}
              icon={TrendingUp}
              color="violet"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Recent Orders</h3>
              {recentOrders.length === 0 ? (
                <p className="text-sm text-text-muted py-8 text-center">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60 hover:bg-violet-50/40 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{order.userName || 'Unknown'}</p>
                        <p className="text-xs text-text-muted">
                          {order.timestamp ? new Date(order.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-text-primary">₹{order.totalPrice}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          order.status === 'delivered' || order.status === 'collected' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'cancelled' || order.status === 'expired' ? 'bg-red-100 text-red-700' :
                          'bg-violet-100 text-violet-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-strong rounded-2xl p-5">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Platform Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Active Colleges</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {colleges.filter((c) => c.status === 'active').length} / {colleges.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Total Canteens</span>
                  <span className="text-sm font-semibold text-text-primary">{canteens.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Super Admins</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {users.filter((u) => u.role === 'superadmin').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Owners</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {users.filter((u) => u.role === 'owner').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Chefs</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {users.filter((u) => u.role === 'chef').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-lavender-50/60">
                  <span className="text-sm text-text-secondary">Customers</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {users.filter((u) => u.role === 'customer').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
