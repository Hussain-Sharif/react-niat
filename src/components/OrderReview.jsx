import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'

export default function OrderReview({ dishes, selectedDishIds, open, onClose, onRemoveDish, onContinue }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const selectedDishes = dishes.filter(dish => selectedDishIds.includes(dish.id))
  
  const subtotal = selectedDishes.reduce((sum, dish) => sum + dish.price, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const groupedByCategory = selectedDishes.reduce((acc, dish) => {
    const category = dish.mealType
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(dish)
    return acc
  }, {})

  const Content = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-6 border-2 border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Your Party Order</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDishes.length} {selectedDishes.length === 1 ? 'dish' : 'dishes'} selected
            </p>
          </div>
        </div>
      </div>

      {/* Dishes List by Category */}
      <ScrollArea className="h-[400px] md:h-[450px] pr-4">
        <div className="space-y-6">
          {Object.entries(groupedByCategory).map(([category, dishes]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
                  {category}
                </h4>
                <Badge variant="secondary" className="ml-auto">
                  {dishes.length}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {dishes.map((dish) => (
                  <div 
                    key={dish.id} 
                    className="flex gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
                  >
                    {/* Dish Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Dish Details */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-sm mb-1 truncate">{dish.name}</h5>
                      <p className="text-xs text-muted-foreground mb-2">
                        {dish.category} • {dish.type}
                      </p>
                      <div className="flex items-center gap-2">
                        {dish.dietaryTags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <span className="font-bold text-blue-600">
                        ${dish.price.toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => onRemoveDish(dish.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Price Breakdown */}
      <div className="space-y-3 bg-muted/30 rounded-xl p-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="flex-1 h-12 rounded-xl"
          onClick={onClose}
        >
          <X className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
        <Button
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg"
          onClick={onContinue}
        >
          <CheckCircle2 className="mr-2 h-5 w-5" />
          Confirm Order
        </Button>
      </div>
    </div>
  )

  // Mobile: Sheet (drawer from bottom)
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[95vh] rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl">Review Your Order</SheetTitle>
          </SheetHeader>
          <Content />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white max-h-[75vh] overflow-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Review Your Order</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  )
}
