import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import type { Canteen, Order, Review } from '../types';
import { TrendingUp, ShoppingCart, Star, DollarSign } from 'lucide-react';
import StatCard from '../components/StatCard';

interface CanteenAnalytics {
  canteen: Canteen;
  orders: Order[];
  reviews: Review[];
  totalRevenue: number;
  avgRating: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<CanteenAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const canteens = (await api.canteens.list()) as Canteen[];
      const results: CanteenAnalytics[] = [];

      for (const c of canteens || []) {
        try {
          const data = await api.canteenData.get(c._id);
          const orders = (data?.orders || []) as Order[];
          const reviews = (data?.reviews || []) as Review[];
          const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
          const avgRating = reviews.length
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
          results.push({ canteen: c, orders, reviews, totalRevenue, avgRating });
        } catch {
          results.push({ canteen: c, orders: [], reviews: [], totalRevenue: 0, avgRating: 0 });
        }
      }

      setAnalytics(results);
    } catch (err) {
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalOrders = analytics.reduce((s, a) => s + a.orders.length, 0);
  const totalRevenue = analytics.reduce((s, a) => s + a.totalRevenue, 0);
  const totalReviews = analytics.reduce((s, a) => s + a.reviews.length, 0);
  const overallAvgRating = totalReviews > 0
    ? analytics.reduce((s, a) => s + a.reviews.reduce((rs, r) => rs + r.rating, 0), 0) / totalReviews
    : 0;

  const ordersByStatus = (analytics.flatMap((a) => a.orders)).reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      preparing: 'bg-orange-100 text-orange-700',
      ready: 'bg-violet-100 text-violet-700',
      completed: 'bg-emerald-100 text-emerald-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-text-primary">Analytics</h1>
        <p className="text-sm text-text-secondary mt-1">Platform-wide performance and insights</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-violet-300 border-t-violet-600 rounded-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Orders" value={totalOrders} icon={ShoppingCart} color="blue" />
            <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} color="green" />
            <StatCard label="Avg Rating" value={overallAvgRating.toFixed(1)} icon={Star} color="orange" />
            <StatCard label="Total Reviews" value={totalReviews} icon={TrendingUp} color="violet" />
          </div>

          {/* Orders by Status */}
          <div className="glass-strong rounded-2xl p-5">
            <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Orders by Status</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lavender-50/80">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(status)}`}>
                    {status}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">{count as number}</span>
                </div>
              ))}
              {Object.keys(ordersByStatus).length === 0 && (
                <p className="text-sm text-text-muted">No order data available</p>
              )}
            </div>
          </div>

          {/* Per-Canteen Table */}
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-display font-semibold text-lg text-text-primary">Canteen Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-lavender-50/50">
                    <th className="text-left px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">Canteen</th>
                    <th className="text-left px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">College</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">Orders</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">Revenue</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">Reviews</th>
                    <th className="text-right px-5 py-3 font-semibold text-text-secondary text-xs uppercase tracking-wider">Avg Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-text-muted">No canteen data available</td>
                    </tr>
                  ) : (
                    analytics.map((a) => (
                      <tr key={a.canteen._id} className="border-b border-border/50 last:border-0 hover:bg-violet-50/30 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-text-primary">{a.canteen.name}</td>
                        <td className="px-5 py-3.5 text-text-secondary">{a.canteen.collegeName || '-'}</td>
                        <td className="px-5 py-3.5 text-right font-medium text-text-primary">{a.orders.length}</td>
                        <td className="px-5 py-3.5 text-right font-medium text-text-primary">₹{a.totalRevenue.toLocaleString()}</td>
                        <td className="px-5 py-3.5 text-right font-medium text-text-primary">{a.reviews.length}</td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                            <Star className="w-3 h-3" />
                            {a.avgRating > 0 ? a.avgRating.toFixed(1) : '-'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
