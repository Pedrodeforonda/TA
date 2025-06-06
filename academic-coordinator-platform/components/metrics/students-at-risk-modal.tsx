"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle, Mail } from "lucide-react"

interface StudentsAtRiskModalProps {
  onClose: () => void
}

export function StudentsAtRiskModal({ onClose }: StudentsAtRiskModalProps) {
  const studentsAtRisk = [
    { name: "Ana Martínez", subject: "Física I", attendance: 65, email: "ana.martinez@mail.com" },
    { name: "Pedro Rodríguez", subject: "Álgebra I", attendance: 70, email: "pedro.rodriguez@mail.com" },
    { name: "Sofía López", subject: "Química General", attendance: 68, email: "sofia.lopez@mail.com" },
    { name: "Diego Fernández", subject: "Matemática II", attendance: 72, email: "diego.fernandez@mail.com" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Estudiantes en Riesgo</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentsAtRisk.map((student, index) => (
              <div key={index} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.subject}</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {student.attendance}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{student.email}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Contactar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
