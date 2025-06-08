"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { range: "0-10%", students: 2 },
  { range: "10-20%", students: 1 },
  { range: "20-30%", students: 0 },
  { range: "30-40%", students: 1 },
  { range: "40-50%", students: 3 },
  { range: "50-60%", students: 4 },
  { range: "60-70%", students: 8 },
  { range: "70-80%", students: 15 },
  { range: "80-90%", students: 25 },
  { range: "90-100%", students: 18 },
]

export function AttendanceDistributionChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">Rango: {label}</p>
          <p className="text-sm">
            <span className="text-blue-600">Estudiantes: </span>
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
        <CardTitle>Distribución de Asistencia General por Estudiantes</CardTitle>
        <p className="text-sm text-gray-600">Número de estudiantes por rango de asistencia</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" fontSize={12} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
