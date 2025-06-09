"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StudentsAtRiskPageProps {
  onBack: () => void
  onViewProfile: (student: any) => void
}

export function StudentsAtRiskPage({ onBack, onViewProfile }: StudentsAtRiskPageProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const studentsAtRisk = [
    {
      id: 1,
      name: "Ana Martínez",
      email: "ana.martinez@mail.com",
      riskLevel: "alto",
    },
    {
      id: 2,
      name: "Pedro Rodríguez",
      email: "pedro.rodriguez@mail.com",
      riskLevel: "medio",
    },
    {
      id: 3,
      name: "Sofía López",
      email: "sofia.lopez@mail.com",
      riskLevel: "medio",
    },
    {
      id: 4,
      name: "Diego Fernández",
      email: "diego.fernandez@mail.com",
      riskLevel: "bajo",
    },
    {
      id: 5,
      name: "Carmen Ruiz",
      email: "carmen.ruiz@mail.com",
      riskLevel: "alto",
    },
  ]

  const filteredStudents = studentsAtRisk.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case "alto":
        return <Badge variant="destructive">Alto</Badge>
      case "medio":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Medio
          </Badge>
        )
      case "bajo":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Bajo
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estudiantes en Riesgo</h1>
          <p className="text-gray-600">Estudiantes con menos del 75% de asistencia</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista Detallada de Estudiantes</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Riesgo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => onViewProfile(student)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
