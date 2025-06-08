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

interface DaySchedule {
  day: string
  startTime: string
  endTime: string
}

export function CreateSubjectForm({ onCreateSubject, onCancel }: CreateSubjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  })

  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>([])

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
    if (daySchedules.length === 0) {
      alert("Debe seleccionar al menos un día con horarios")
      return
    }

    const subjectData = {
      ...formData,
      schedules: daySchedules,
    }
    onCreateSubject(subjectData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDayChange = (dayId: string, checked: boolean) => {
    if (checked) {
      // Agregar día con horarios por defecto
      setDaySchedules((prev) => [...prev, { day: dayId, startTime: "08:00", endTime: "10:00" }])
    } else {
      // Remover día
      setDaySchedules((prev) => prev.filter((schedule) => schedule.day !== dayId))
    }
  }

  const updateScheduleTime = (dayId: string, field: "startTime" | "endTime", value: string) => {
    setDaySchedules((prev) =>
      prev.map((schedule) => (schedule.day === dayId ? { ...schedule, [field]: value } : schedule)),
    )
  }

  const isDaySelected = (dayId: string) => {
    return daySchedules.some((schedule) => schedule.day === dayId)
  }

  const getDaySchedule = (dayId: string) => {
    return daySchedules.find((schedule) => schedule.day === dayId)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Crear Nueva Materia</CardTitle>
          <CardDescription>Completa los datos básicos de la materia y configura los horarios por día</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-4">
              <Label>Días y Horarios *</Label>
              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Checkbox
                        id={day.id}
                        checked={isDaySelected(day.id)}
                        onCheckedChange={(checked) => handleDayChange(day.id, checked as boolean)}
                      />
                      <Label htmlFor={day.id} className="text-base font-medium">
                        {day.label}
                      </Label>
                    </div>

                    {isDaySelected(day.id) && (
                      <div className="ml-6 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Hora Inicio</Label>
                          <Input
                            type="time"
                            value={getDaySchedule(day.id)?.startTime || ""}
                            onChange={(e) => updateScheduleTime(day.id, "startTime", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Hora Fin</Label>
                          <Input
                            type="time"
                            value={getDaySchedule(day.id)?.endTime || ""}
                            onChange={(e) => updateScheduleTime(day.id, "endTime", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
              <Button type="submit" disabled={daySchedules.length === 0}>
                Crear Materia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
