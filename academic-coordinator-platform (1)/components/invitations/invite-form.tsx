"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

interface InviteFormProps {
  type: "professors" | "students"
  onInvite: (email: string) => void
  onBack: () => void
}

export function InviteForm({ type, onInvite, onBack }: InviteFormProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onInvite(email.trim())
      setEmail("")
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-6">
      <Button variant="outline" onClick={onBack} className="mb-6">
        ← Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Invitar {type === "professors" ? "Profesor" : "Alumno"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar Invitación
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
