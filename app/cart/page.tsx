"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeItem, totalPrice } = useCart()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")

  const deliveryFee = cart.length > 0 ? 3.5 : 0
  const total = totalPrice + deliveryFee

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">MAMMAMIA</span>
          </Link>
          <Link href="/menu">
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Terug naar Menu
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8">Winkelwagen</h1>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Je winkelwagen is leeg</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">Voeg gerechten toe om je bestelling te starten</p>
            <Link href="/menu">
              <Button size="lg">Bekijk Menu</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-lg">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="font-semibold text-xl mb-4">Bestelling</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotaal</span>
                    <span className="font-medium">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bezorgkosten</span>
                    <span className="font-medium">€{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Totaal</span>
                    <span className="font-bold text-xl">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Kortingscode</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Voer code in"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Toepassen</Button>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleCheckout}>
                  Afrekenen
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                  Minimale bestelling €15,00
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
