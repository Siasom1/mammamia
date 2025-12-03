"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Truck, Home } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryMethod: "delivery",
    paymentMethod: "ideal",
    notes: "",
  })

  const deliveryFee = formData.deliveryMethod === "delivery" ? 3.5 : 0
  const total = totalPrice + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order (in real app, send to backend)
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase()

    clearCart()
    router.push(`/order-status/${orderId}`)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">MAMMAMIA</span>
          </Link>
          <Link href="/cart">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Terug
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8">Afrekenen</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <Card className="p-6">
                <h2 className="font-semibold text-xl mb-4">Contactgegevens</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Naam *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder="Voor- en achternaam"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="jouw@email.nl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefoon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="06 12345678"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Delivery Method */}
              <Card className="p-6">
                <h2 className="font-semibold text-xl mb-4">Bezorgmethode</h2>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => updateFormData("deliveryMethod", value)}
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Bezorgen</div>
                          <div className="text-sm text-muted-foreground">30-45 minuten</div>
                        </div>
                      </div>
                    </Label>
                    <span className="font-medium">€3,50</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Afhalen</div>
                          <div className="text-sm text-muted-foreground">20-30 minuten</div>
                        </div>
                      </div>
                    </Label>
                    <span className="font-medium">Gratis</span>
                  </div>
                </RadioGroup>
              </Card>

              {/* Address */}
              {formData.deliveryMethod === "delivery" && (
                <Card className="p-6">
                  <h2 className="font-semibold text-xl mb-4">Bezorgadres</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Straat en huisnummer *</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        placeholder="Straatnaam 123"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Postcode *</Label>
                        <Input
                          id="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={(e) => updateFormData("postalCode", e.target.value)}
                          placeholder="1234 AB"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Plaats *</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                          placeholder="Amsterdam"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="font-semibold text-xl mb-4">Betaalmethode</h2>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData("paymentMethod", value)}
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="ideal" id="ideal" />
                    <Label htmlFor="ideal" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium">iDEAL</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium">Creditcard</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span className="font-medium">PayPal</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </Card>

              {/* Notes */}
              <Card className="p-6">
                <h2 className="font-semibold text-xl mb-4">Opmerkingen</h2>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                  placeholder="Speciale wensen of allergieën..."
                  rows={4}
                />
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="font-semibold text-xl mb-4">Bestelling</h2>

                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotaal</span>
                    <span className="font-medium">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formData.deliveryMethod === "delivery" ? "Bezorgkosten" : "Afhalen"}
                    </span>
                    <span className="font-medium">
                      {formData.deliveryMethod === "delivery" ? `€${deliveryFee.toFixed(2)}` : "Gratis"}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Totaal</span>
                    <span className="font-bold text-xl">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Verwerken..." : "Bestelling Plaatsen"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                  Door te bestellen ga je akkoord met onze algemene voorwaarden
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
