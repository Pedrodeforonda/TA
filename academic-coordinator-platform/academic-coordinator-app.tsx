"use client"

import { useState } from "react"
import { LoginForm } from "./components/auth/login-form"
import { CreateInstitutionForm } from "./components/institution/create-institution-form"
import { InstitutionLayout } from "./components/institution/institution-layout"
import { CreateSubjectForm } from "./components/subjects/create-subject-form"

type AppState = "login" | "create-institution" | "institution-dashboard"

export default function AcademicCoordinatorApp() {
  const [appState, setAppState] = useState<AppState>("login")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [currentInstitution, setCurrentInstitution] = useState<any>(null)
  const [showCreateSubject, setShowCreateSubject] = useState(false)

  const handleLogin = (userType: string, credentials: any) => {
    setCurrentUser({ type: userType, ...credentials })

    if (userType === "coordinator") {
      setAppState("create-institution")
    } else {
      alert(`Login como ${userType} - Funcionalidad pendiente`)
    }
  }

  const handleCreateInstitution = (institutionData: any) => {
    setCurrentInstitution(institutionData)
    setAppState("institution-dashboard")
  }

  const handleCreateSubject = (subjectData: any) => {
    console.log("Nueva materia creada:", subjectData)
    setShowCreateSubject(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentInstitution(null)
    setAppState("login")
  }

  if (appState === "login") {
    return <LoginForm onLogin={handleLogin} />
  }

  if (appState === "create-institution") {
    return <CreateInstitutionForm onCreateInstitution={handleCreateInstitution} />
  }

  if (appState === "institution-dashboard") {
    return (
      <>
        <InstitutionLayout
          institutionName={currentInstitution?.name || "Mi Institución"}
          onLogout={handleLogout}
          onCreateSubject={() => setShowCreateSubject(true)}
        />
        {showCreateSubject && (
          <CreateSubjectForm onCreateSubject={handleCreateSubject} onCancel={() => setShowCreateSubject(false)} />
        )}
      </>
    )
  }

  return null
}
