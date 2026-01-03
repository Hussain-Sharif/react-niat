import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

export default function OrderSummary({ selectedDishes, totalPrice, onReviewClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="glass-effect border-t shadow-2xl">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Selected Items Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                {selectedDishes > 0 && (
                  <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-background animate-scale-in">
                    {selectedDishes}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Selected Items</p>
                <p className="text-lg font-bold">{selectedDishes} {selectedDishes === 1 ? 'dish' : 'dishes'}</p>
              </div>
            </div>

            {/* Total Price - Desktop */}
            <div className="hidden sm:block text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Total Amount</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Review Order Button */}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 rounded-xl group"
              onClick={onReviewClick}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Review Order 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile: Show total price */}
          <div className="sm:hidden mt-4 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Total Amount</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
