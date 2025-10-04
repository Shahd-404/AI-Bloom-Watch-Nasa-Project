import React, { useMemo } from "react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

type Row = { id: number; title: string; date: string; status: "Ready" | "Processing" };

export default function ReportsPanel() {
  const rows = useMemo<Row[]>(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        title: `Report ${i + 1}`,
        date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
        status: i % 2 === 0 ? "Ready" : "Processing",
      })),
    []
  );

  return (
    <section>
      <h2 className="text-2xl font-bold">Reports</h2>
      <p className="mt-1 text-slate-600">تقارير قابلة للتنزيل (PDF/CSV) مع حالات جاهزية.</p>

      <Card className="mt-6 overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">العنوان</th>
                <th className="px-4 py-3">التاريخ</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 text-slate-500">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-slate-600">{r.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                        r.status === "Ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700",
                      ].join(" ")}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="outline" rounded="xl" className="text-sm">
                      تنزيل
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
