"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Calendar } from "lucide-react"

interface CreateSubjectFormProps {
  onCreateSubject: (subjectData: any) => void
  onCancel: () => void
}

interface ScheduleItem {
  day: string
  startTime: string
  endTime: string
  id: string
}

export function CreateSubjectForm({ onCreateSubject, onCancel }: CreateSubjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  })

  const [currentSchedule, setCurrentSchedule] = useState<ScheduleItem>({
    day: "Lunes",
    startTime: "08:00",
    endTime: "10:00",
    id: "",
  })

  const [schedules, setSchedules] = useState<ScheduleItem[]>([])

  const daysOfWeek = [
    { value: "Lunes", label: "Lunes" },
    { value: "Martes", label: "Martes" },
    { value: "Miércoles", label: "Miércoles" },
    { value: "Jueves", label: "Jueves" },
    { value: "Viernes", label: "Viernes" },
    { value: "Sábado", label: "Sábado" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (schedules.length === 0) {
      alert("Debe agregar al menos un horario")
      return
    }

    const subjectData = {
      ...formData,
      schedules: schedules,
    }
    onCreateSubject(subjectData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleScheduleChange = (field: string, value: string) => {
    setCurrentSchedule((prev) => ({ ...prev, [field]: value }))
  }

  const addSchedule = () => {
    const newSchedule = {
      ...currentSchedule,
      id: Date.now().toString(),
    }
    setSchedules([...schedules, newSchedule])
    setCurrentSchedule({
      day: "Lunes",
      startTime: "08:00",
      endTime: "10:00",
      id: "",
    })
  }

  const removeSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Crear Nueva Materia</CardTitle>
          <CardDescription>Completa los datos básicos de la materia y configura los horarios</CardDescription>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha Inicio *</Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha Fin *</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Agregar Horario</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">Día</Label>
                  <Select value={currentSchedule.day} onValueChange={(value) => handleScheduleChange("day", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar día" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={currentSchedule.startTime}
                    onChange={(e) => handleScheduleChange("startTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={currentSchedule.endTime}
                    onChange={(e) => handleScheduleChange("endTime", e.target.value)}
                  />
                </div>
              </div>
              <Button type="button" onClick={addSchedule} className="mt-2" variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Horario
              </Button>
            </div>

            {schedules.length > 0 && (
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Horarios Actuales</h3>
                <div className="space-y-2">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-gray-600 ml-2">
                          {schedule.startTime} - {schedule.endTime}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSchedule(schedule.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={schedules.length === 0}>
                Crear Materia
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
