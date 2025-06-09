"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Datos de ejemplo para 32 clases de una materia anual
const generateClassData = (baseAttendance: number, variation: number) => {
  const data = []
  for (let i = 1; i <= 32; i++) {
    const randomVariation = (Math.random() - 0.5) * variation
    const attendance = Math.max(0, Math.min(100, baseAttendance + randomVariation))
    data.push({
      class: `Clase ${i}`,
      classNumber: i,
      attendance: Math.round(attendance),
    })
  }
  return data
}

const subjectData = {
  "Física I": generateClassData(75, 30),
  "Álgebra I": generateClassData(88, 15),
  "Química General": generateClassData(65, 25),
  "Programación I": generateClassData(82, 20),
  "Matemática II": generateClassData(70, 35),
}

export function AttendanceBySubjectTimeChart() {
  const [selectedSubject, setSelectedSubject] = useState("Física I")

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

  const formatXAxisLabel = (tickItem: any, index: number) => {
    // Mostrar solo cada 4ta clase para evitar saturación
    return index % 4 === 0 ? `C${tickItem}` : ""
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Evolución de Asistencia por Materia</CardTitle>
          <p className="text-sm text-gray-600">Asistencia por clase durante el año académico</p>
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar materia" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(subjectData).map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={subjectData[selectedSubject as keyof typeof subjectData]}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="classNumber"
              tickFormatter={formatXAxisLabel}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
              label={{ value: "Clases", position: "insideBottom", offset: -10 }}
            />
            <YAxis domain={[0, 100]} label={{ value: "Asistencia (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="attendance"
              name="Asistencia"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
