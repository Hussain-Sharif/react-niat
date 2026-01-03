import { ArrowLeft, Flame, DollarSign } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'

export default function IngredientDetail({ dish, open, onClose }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!dish) return null

  const Content = () => (
    <div className="space-y-6 animate-fade-in bg-white">
      {/* Dish Image */}
      <div className="relative h-56 md:h-72 overflow-hidden rounded-2xl shadow-xl">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Price badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm text-blue-600 font-bold text-2xl px-5 py-3 rounded-full shadow-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {dish.price.toFixed(2)}
          </div>
        </div>

        {/* Dietary badges */}
        {dish.dietaryTags && dish.dietaryTags.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {dish.dietaryTags.map((tag) => (
              <Badge key={tag} className="bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Dish Info */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold leading-tight">{dish.name}</h2>
        <p className="text-muted-foreground leading-relaxed">{dish.shortDescription}</p>
        
        <div className="flex items-center flex-wrap gap-4 pt-2">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {dish.category}
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {dish.type}
          </Badge>
          {dish.calories && (
            <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              {dish.calories} kcal
            </Badge>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Ingredients List */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full" />
          Ingredients
        </h3>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-2">
            {dish.ingredients && dish.ingredients.length > 0 ? (
              dish.ingredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="font-medium group-hover:text-blue-600 transition-colors">
                    {ingredient.name}
                  </span>
                  <span className="text-muted-foreground font-semibold bg-muted px-3 py-1 rounded-full">
                    {ingredient.quantity}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No ingredients information available</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )

  // Mobile: Sheet
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl">
          <SheetHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <SheetTitle className="text-xl">Dish Details</SheetTitle>
            </div>
          </SheetHeader>
          <ScrollArea className="h-full pb-8 mt-4">
            <Content />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[92vh] bg-white overflow-hidden rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Dish Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(92vh-80px)] pr-4">
          <Content />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
