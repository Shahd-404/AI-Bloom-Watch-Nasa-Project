import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

export default function AnalysisPanel() {
  return (
    <section>
      <h2 className="text-2xl font-bold">Analysis</h2>
      <p className="mt-1 text-slate-600">لوحة مؤشرات مختصرة + مساحة للرسوم البيانية.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Visitors", "Conversions", "Bounce", "Avg. Time"].map((k) => (
          <Card key={k}>
            <CardContent>
              <p className="text-xs text-slate-500">{k}</p>
              <p className="text-2xl font-bold mt-1">{Math.round(1000 + Math.random() * 9000)}</p>
              <p className="text-xs text-emerald-600 mt-1">
                +{(Math.random() * 10).toFixed(1)}% this week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent>
          <h3 className="font-semibold">Chart Placeholder</h3>
          <div className="mt-4 h-64 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 grid place-items-center text-slate-500">
            ضع هنا Recharts أو أي مكتبة رسوم
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
