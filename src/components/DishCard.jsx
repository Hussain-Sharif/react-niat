import { useState } from 'react'
import { Plus, Minus, ChevronDown, ChevronUp, Leaf, Flame } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export default function DishCard({ dish, isAdded, onToggle, onViewIngredients }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const getDietaryBadgeColor = (tag) => {
    switch (tag) {
      case 'V': return 'bg-green-500 text-white hover:bg-green-600'
      case 'GF': return 'bg-amber-500 text-white hover:bg-amber-600'
      case 'K': return 'bg-purple-500 text-white hover:bg-purple-600'
      default: return 'bg-gray-500 text-white hover:bg-gray-600'
    }
  }

  const getTypeIcon = () => {
    if (dish.type === 'VEG') {
      return <Leaf className="h-3 w-3 text-green-600" />
    }
    return <Flame className="h-3 w-3 text-red-600" />
  }

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in ${
      isAdded ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' : 'hover:shadow-lg'
    }`}>
      {/* Image Section with overlay on hover */}
      <div className="relative h-52 overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
        )}
        <img
          src={dish.image}
          alt={dish.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {dish.dietaryTags && dish.dietaryTags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {dish.dietaryTags.map((tag) => (
                <Badge 
                  key={tag} 
                  className={`${getDietaryBadgeColor(tag)} shadow-lg animate-scale-in`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {isAdded && (
            <Badge className="bg-blue-500 text-white shadow-lg animate-scale-in ml-auto">
              ✓ Added
            </Badge>
          )}
        </div>

        {/* Price badge at bottom */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm text-blue-600 font-bold text-xl px-4 py-2 rounded-full shadow-lg">
            ${dish.price.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Title and type */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="mt-1">{getTypeIcon()}</div>
            <div className="flex-1">
              <h3 className="font-bold text-xl leading-tight group-hover:text-blue-600 transition-colors">
                {dish.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span className="font-medium">{dish.category}</span>
                {dish.calories && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {dish.calories} kcal
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p className={showFullDescription ? '' : 'line-clamp-2'}>
            {showFullDescription ? dish.fullDescription : dish.shortDescription}
          </p>
        </div>

        {/* Read More/Less Button */}
        {dish.fullDescription && dish.fullDescription !== dish.shortDescription && (
          <Button
            variant="ghost"
            size="sm"
            className="px-0 h-auto text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? (
              <>
                Read Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 hover:bg-muted transition-all"
            onClick={onViewIngredients}
          >
            View Ingredients
          </Button>
          <Button
            className={`flex-1 transition-all shadow-md hover:shadow-lg ${
              isAdded 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={onToggle}
          >
            {isAdded ? (
              <>
                <Minus className="mr-2 h-4 w-4" /> Remove
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
