"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { range: "0-10%", subjects: 0 },
  { range: "10-20%", subjects: 0 },
  { range: "20-30%", subjects: 0 },
  { range: "30-40%", subjects: 1 },
  { range: "40-50%", subjects: 2 },
  { range: "50-60%", subjects: 3 },
  { range: "60-70%", subjects: 5 },
  { range: "70-80%", subjects: 8 },
  { range: "80-90%", subjects: 6 },
  { range: "90-100%", subjects: 3 },
]

export function AttendanceDistributionBySubjectChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">Rango: {label}</p>
          <p className="text-sm">
            <span className="text-blue-600">Materias: </span>
            {payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Asistencia General por Materias</CardTitle>
        <p className="text-sm text-gray-600">Número de materias por rango de asistencia</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" fontSize={12} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="subjects" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
