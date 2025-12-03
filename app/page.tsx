"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingBag, Clock, MapPin, Phone } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function HomePage() {
  const { cart } = useCart()
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    setCartItemCount(cart.reduce((sum, item) => sum + item.quantity, 0))
  }, [cart])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">MAMMAMIA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#menu" className="text-sm font-medium hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="#over" className="text-sm font-medium hover:text-primary transition-colors">
              Over Ons
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="/cart">
            <Button size="sm" variant="default" className="gap-2 relative">
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:inline">Bestellen</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="./mammamia1.jpeg"
            alt="Grillende shoarma"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-balance">Echte Shoarma vers van de Grill</h1>
          <p className="text-lg md:text-xl mb-8 text-pretty text-white/90 leading-relaxed">
            Authentieke shoarma en spareribs dat zijn onze specialiteiten daarnaast hebben wij ook falafel, vers bereid. Kom lekker eten, afhalen of bezorgen is mogelijk.
            Opening actie vanaf 6 personen 20% korting
          
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Bekijk Menu
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Neem Contact Op
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Snelle Bezorging</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Verse gerechten binnen 30-45 minuten bij jou thuisbezorgd
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Online Bestellen</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bestel gemakkelijk online via onze website of app
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2"> Locatie Wagenaarstraat 16 Amsterdam Oost</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Afhalen of bezorgen
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Dishes Preview */}
      <section className="py-16" id="menu">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Onze Gerechten</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Ontdek onze meest geliefde gerechten, vers bereid op de grill met authentieke kruiden
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">€{dish.price.toFixed(2)}</span>
                    <Link href="/menu">
                      <Button size="sm">Bestellen</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/menu">
              <Button size="lg" variant="outline">
                Volledig Menu Bekijken
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30" id="over">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-6">Over MAMMAMIA</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sinds 1989 serveren wij echte shoarma, falafel en grill specialiteiten in de regio. Onze passie voor verse
                ingrediënten en authentieke bereidingsmethoden zorgt voor een onvergetelijke smaakervaring.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Van vers gegrilde kip, shoarma tot sappige mixed grill - elk gerecht wordt met liefde en zorg bereid
                volgens traditionele recepten en met de beste kruiden.
              </p>
              <Link href="/menu">
                <Button size="lg">Bestel Nu</Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/mammamia2.jpeg"
                alt="Chef bereidt shoarma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16" id="contact">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Bezoek Ons</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Kom langs of neem contact met ons op</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold text-xl mb-4">Amsterdam Oost</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">Wagenaarstraat 16, 1093 CR Amsterdam</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">020-2235996</span>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">Ma-Do: 11:00 - 23:00 Weekend: 11:00 - 02:00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-xl mb-4">MAMMAMIA</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Verse shoarma en grill specialiteiten, met liefde bereid en geserveerd.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/menu?category=shoarma" className="text-muted-foreground hover:text-foreground">
                    Shoarma
                  </Link>
                </li>
                <li>
                  <Link href="/menu?category=grill" className="text-muted-foreground hover:text-foreground">
                    Mixed Grill
                  </Link>
                </li>
                <li>
                  <Link href="/menu?category=kapsalon" className="text-muted-foreground hover:text-foreground">
                    Kapsalon
                  </Link>
                </li>
                <li>
                  <Link href="/menu?category=salades" className="text-muted-foreground hover:text-foreground">
                    Salades
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informatie</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#over" className="text-muted-foreground hover:text-foreground">
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  {/* <Link href="/algemene-voorwaarden" className="text-muted-foreground hover:text-foreground">
                    Algemene Voorwaarden
                  </Link> */}
                </li>
                <li>
                  {/* <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link> */}
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-4">Volg Ons</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    TikTok
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 MAMMAMIA. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const popularDishes = [
  {
    id: 1,
    name: "Kipshoarma Schotel",
    description: "Verse kipshoarma, met rijst of patat of gebakken aardappelen , salade, saus",
    price: 17.5,
    image: "/kipshoarma.jpeg",
  },
  {
    id: 2,
    name: "Shoarma",
    description: "Shoarma medium en large vanaf",
    price: 8.5,
    image: "/shoarmaschotel.jpg",
  },
  {
    id: 3,
    name: "Spareribs schotel inclusief salade patat of gebakken aardappel en saus",
    description: "Spareribs",
    price: 19.5,
    image: "/sparerib.jpeg",
  },
  {
    id: 4,
    name: "Verschillende Wraps",
    description: "Kip,Shoarma,of Falafel, vegetarisch ook mogelijk groenten, knoflooksaus",
    price: 9.5,
    image: "/wraps.jpeg",
  },
]
