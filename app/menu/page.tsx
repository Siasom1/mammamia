"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Search, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const categories = [
  { id: "all", label: "Alles", count: 32 },
  { id: "shoarma", label: "Shoarma", count: 8 },
  { id: "grill", label: "Mixed Grill", count: 6 },
  { id: "kapsalon", label: "Kapsalon", count: 4 },
  { id: "wraps", label: "Wraps & Broodjes", count: 6 },
  { id: "salades", label: "Salades", count: 4 },
  { id: "bijgerechten", label: "Bijgerechten", count: 5 },
  { id: "dranken", label: "Dranken", count: 6 },
]

const menuItems = [
  // Shoarma Schotels
  {
    id: 1,
    name: " Kip shoarma schotel",
    description: "Vers gegrilde kipshoarma, rijst, of patat, of gebakken aardappel, salade, knoflooksaus",
    price: 17.5,
    category: "Kip",
    image: "/kipshoarma.jpeg",
  },
  {
    id: 2,
    name: "Shoarma Schotel",
    description: "Sappige shoarma, rijst, groenten, yoghurtsaus",
    price: 17.5,
    category: "shoarma",
    image: "/shoarmaschotel.jpg",
  },
  {
    id: 3,
    name: "Spareribs Schotel",
    description: "Spareribs, rijst, salade, twee sauzen",
    price: 19.5,
    category: "shoarma",
    image: "/sparerib.jpeg",
  },
  {
    id: 4,
    name: "Vegetarische Falafel Schotel",
    description: "Huisgemaakte falafel, hummus, tabouleh, tahinsaus",
    price: 12.5,
    category: "shoarma",
    image: "/falafel-plate-hummus-vegetables-tahini.jpg",
    vegetarian: true,
  },

  // Mixed Grill
  {
    id: 5,
    name: "Wrapps",
    description: "Kipspies, lamskoteletten, kofta, rijst, groenten",
    price: 9.5,
    category: "grill",
    image: "/mixed-grill-platter-meat-skewers-rice.jpg",
  },
  {
    id: 6,
    name: "Kipspies",
    description: "Gemarineerde kipfilet aan het spit, rijst, salade",
    price: 14.5,
    category: "grill",
    image: "/chicken-skewers-grilled-rice-salad.jpg",
  },
  {
    id: 7,
    name: "Lamskoteletten",
    description: "Malse lamskoteletten, aardappelen, gegrilde groenten",
    price: 16.5,
    category: "grill",
    image: "/lamb-chops-grilled-potatoes-vegetables.jpg",
  },
  {
    id: 8,
    name: "Kofta Kebab",
    description: "Gekruid gehakt aan het spit, rijst, groenten",
    price: 13.5,
    category: "grill",
    image: "/kofta-kebab-minced-meat-rice.jpg",
  },

  // Kapsalon
  {
    id: 9,
    name: "Kapsalon Kip",
    description: "Friet, kipshoarma, gesmolten kaas, sla, tomaat, komkommer, saus",
    price: 9.5,
    category: "kapsalon",
    image: "/kapsalon-fries-shawarma-cheese-salad.jpg",
  },
  {
    id: 10,
    name: "Kapsalon Lams",
    description: "Friet, lamsshoarma, gesmolten kaas, sla, tomaat, komkommer, saus",
    price: 10.5,
    category: "kapsalon",
    image: "/kapsalon-lamb-fries-cheese-vegetables.jpg",
  },
  {
    id: 11,
    name: "Kapsalon Mix",
    description: "Friet, kip & lams shoarma, kaas, volledige salade bar",
    price: 11.0,
    category: "kapsalon",
    image: "/kapsalon-mixed-meat-fries-cheese.jpg",
  },
  {
    id: 12,
    name: "Vegetarische Kapsalon",
    description: "Friet, falafel, kaas, sla, groenten, tahinsaus",
    price: 9.0,
    category: "kapsalon",
    image: "/kapsalon-falafel-vegetarian-cheese.jpg",
    vegetarian: true,
  },

  // Wraps & Broodjes
  {
    id: 13,
    name: "Kipshoarma Wrap",
    description: "Tortilla, kipshoarma, sla, tomaat, komkommer, knoflooksaus",
    price: 7.5,
    category: "wraps",
    image: "/chicken-shawarma-wrap-tortilla-vegetables.jpg",
  },
  {
    id: 14,
    name: "Lamsshoarma Wrap",
    description: "Tortilla, lamsshoarma, groenten, yoghurtsaus",
    price: 8.5,
    category: "wraps",
    image: "/lamb-shawarma-wrap-pita-vegetables.jpg",
  },
  {
    id: 15,
    name: "Falafel Wrap",
    description: "Tortilla, falafel, hummus, tabouleh, tahinsaus",
    price: 7.0,
    category: "wraps",
    image: "/falafel-wrap-hummus-vegetables-tahini.jpg",
    vegetarian: true,
  },
  {
    id: 16,
    name: "Kofta Wrap",
    description: "Tortilla, kofta kebab, groenten, pittige saus",
    price: 8.0,
    category: "wraps",
    image: "/kofta-wrap-spicy-sauce-vegetables.jpg",
    spicy: true,
  },

  // Salades
  {
    id: 17,
    name: "Shoarma Salade Kip",
    description: "Gemengde sla, kipshoarma, groenten, dressing",
    price: 10.5,
    category: "salades",
    image: "/shawarma-chicken-salad-mixed-greens.jpg",
  },
  {
    id: 18,
    name: "Shoarma Salade Lams",
    description: "Gemengde sla, lamsshoarma, groenten, yoghurtdressing",
    price: 11.5,
    category: "salades",
    image: "/shawarma-lamb-salad-vegetables-yogurt.jpg",
  },
  {
    id: 19,
    name: "Falafel Salade",
    description: "Sla, falafel, hummus, olijven, tahindressing",
    price: 9.5,
    category: "salades",
    image: "/falafel-salad-hummus-olives-tahini.jpg",
    vegetarian: true,
  },
  {
    id: 20,
    name: "Griekse Salade",
    description: "Tomaat, komkommer, olijven, feta, olijfolie",
    price: 8.5,
    category: "salades",
    image: "/greek-salad-feta-olives-cucumber.jpg",
    vegetarian: true,
  },

  // Bijgerechten
  {
    id: 21,
    name: "Friet",
    description: "Goudgele friet",
    price: 3.5,
    category: "bijgerechten",
    image: "/french-fries-golden-crispy.jpg",
    vegetarian: true,
  },
  {
    id: 22,
    name: "Rijst",
    description: "Gekruide rijst",
    price: 3.0,
    category: "bijgerechten",
    image: "/seasoned-rice-side-dish.jpg",
    vegetarian: true,
  },
  {
    id: 23,
    name: "Hummus",
    description: "Huisgemaakte hummus met olijfolie",
    price: 4.5,
    category: "bijgerechten",
    image: "/hummus-olive-oil-chickpeas.jpg",
    vegetarian: true,
  },
  {
    id: 24,
    name: "Tabouleh",
    description: "Peterselie salade met bulgur",
    price: 4.0,
    category: "bijgerechten",
    image: "/tabouleh-parsley-salad-bulgur.jpg",
    vegetarian: true,
  },
  {
    id: 25,
    name: "Pitabrood",
    description: "Vers gebakken pitabrood (2 stuks)",
    price: 2.5,
    category: "bijgerechten",
    image: "/pita-bread-fresh-baked.jpg",
    vegetarian: true,
  },

  // Dranken
  {
    id: 26,
    name: "Coca-Cola",
    description: "330ml",
    price: 2.5,
    category: "dranken",
    image: "/placeholder.svg?key=cola1",
  },
  {
    id: 27,
    name: "Fanta",
    description: "330ml",
    price: 2.5,
    category: "dranken",
    image: "/placeholder.svg?key=fanta1",
  },
  {
    id: 28,
    name: "Water",
    description: "500ml",
    price: 2.0,
    category: "dranken",
    image: "/placeholder.svg?key=water1",
  },
  {
    id: 29,
    name: "Ayran",
    description: "Turkse yoghurtdrank",
    price: 2.5,
    category: "dranken",
    image: "/placeholder.svg?key=ayran1",
  },
  {
    id: 30,
    name: "Turkse Thee",
    description: "Traditionele thee",
    price: 2.0,
    category: "dranken",
    image: "/placeholder.svg?key=tea1",
  },
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { addItem, cart } = useCart()

  const filteredItems = useMemo(() => {
    let items = menuItems

    // Filter by category
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return items
  }, [selectedCategory, searchQuery])

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">MAMMAMIA</span>
          </Link>
          <Link href="/cart">
            <Button size="sm" variant="default" className="gap-2 relative">
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
              <span className="hidden sm:inline">Winkelwagen</span>
            </Button>
          </Link>
        </div>
      </header>

      <div className="container px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Ons Menu</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Ontdek onze selectie van verse shoarma en grill specialiteiten, allemaal vers bereid met de beste kruiden
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Zoek een gerecht..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden flex flex-col">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {(item.vegetarian || item.spicy) && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    {item.vegetarian && (
                      <Badge variant="secondary" className="bg-green-500/90 text-white">
                        V
                      </Badge>
                    )}
                    {item.spicy && (
                      <Badge variant="secondary" className="bg-red-500/90 text-white">
                        Pittig
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl">€{item.price.toFixed(2)}</span>
                  <Button size="sm" onClick={() => addItem(item)} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Toevoegen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Geen gerechten gevonden voor "{searchQuery}"</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
