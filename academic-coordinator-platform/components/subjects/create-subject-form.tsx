"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateSubjectFormProps {
  onCreateSubject: (subjectData: any) => void
  onCancel: () => void
}

export function CreateSubjectForm({ onCreateSubject, onCancel }: CreateSubjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    days: [] as string[],
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  })

  const daysOfWeek = [
    { id: "lunes", label: "Lunes" },
    { id: "martes", label: "Martes" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
    { id: "sabado", label: "Sábado" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateSubject(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDayChange = (dayId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      days: checked ? [...prev.days, dayId] : prev.days.filter((d) => d !== dayId),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Nueva Materia</CardTitle>
          <CardDescription>Completa los datos básicos de la materia</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Materia *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Introducción a la Ingeniería"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Días de la Semana *</Label>
              <div className="grid grid-cols-2 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={formData.days.includes(day.id)}
                      onCheckedChange={(checked) => handleDayChange(day.id, checked as boolean)}
                    />
                    <Label htmlFor={day.id} className="text-sm">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora Inicio *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Hora Fin *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha Inicio *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha Fin *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={formData.days.length === 0}>
                Crear Materia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
