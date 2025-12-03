"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Package, Truck, ChefHat } from "lucide-react"

export default function OrderStatusPage({ params }: { params: { orderId: string } }) {
  const [status, setStatus] = useState<"confirmed" | "preparing" | "delivering" | "completed">("confirmed")

  useEffect(() => {
    // Simulate order status updates
    const timer1 = setTimeout(() => setStatus("preparing"), 2000)
    const timer2 = setTimeout(() => setStatus("delivering"), 5000)
    const timer3 = setTimeout(() => setStatus("completed"), 8000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const steps = [
    { id: "confirmed", label: "Bevestigd", icon: CheckCircle2 },
    { id: "preparing", label: "In Bereiding", icon: ChefHat },
    { id: "delivering", label: "Onderweg", icon: Truck },
    { id: "completed", label: "Bezorgd", icon: Package },
  ]

  const currentStepIndex = steps.findIndex((step) => step.id === status)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">MAMMAMIA</span>
          </Link>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-2">Bedankt voor je bestelling!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">Je bestelling is bevestigd en wordt nu bereid</p>

          <div className="bg-muted/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-muted-foreground mb-1">Bestelnummer</p>
            <p className="font-mono text-2xl font-bold">{params.orderId}</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index <= currentStepIndex
                const isCurrent = index === currentStepIndex

                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="absolute w-full h-0.5 bg-muted top-6 left-1/2 -z-10" />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="text-left bg-muted/30 rounded-lg p-6">
              {status === "confirmed" && (
                <div>
                  <h3 className="font-semibold mb-2">Bestelling Bevestigd</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We hebben je bestelling ontvangen en sturen deze door naar de keuken.
                  </p>
                </div>
              )}
              {status === "preparing" && (
                <div>
                  <h3 className="font-semibold mb-2">In Bereiding</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Onze chef is druk bezig met het bereiden van jouw gerechten met verse ingrediënten.
                  </p>
                </div>
              )}
              {status === "delivering" && (
                <div>
                  <h3 className="font-semibold mb-2">Onderweg</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Je bestelling is onderweg! Verwachte levertijd: 15-20 minuten.
                  </p>
                </div>
              )}
              {status === "completed" && (
                <div>
                  <h3 className="font-semibold mb-2">Bezorgd</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Je bestelling is bezorgd. Eet smakelijk!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" variant="outline">
                Terug naar Menu
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg">Naar Homepage</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
