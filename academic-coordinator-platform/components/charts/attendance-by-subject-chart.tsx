"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Álgebra I", attendance: 92, color: "#22c55e" },
  { name: "Intro. Ingeniería", attendance: 85, color: "#22c55e" },
  { name: "Física I", attendance: 78, color: "#eab308" },
  { name: "Química General", attendance: 82, color: "#eab308" },
  { name: "Matemática II", attendance: 75, color: "#eab308" },
  { name: "Programación I", attendance: 68, color: "#ef4444" },
]

export function AttendanceBySubjectChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-blue-600">Asistencia: </span>
            {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencia General por Materia</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
            <YAxis domain={[0, 100]} label={{ value: "Porcentaje (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="attendance" fill={(entry) => entry.color} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Bar key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
