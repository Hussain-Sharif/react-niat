import { useState, useMemo } from 'react'
import { ArrowLeft, ShoppingBag, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SearchBar from '@/components/SearchBar'
import DishCard from '@/components/DishCard'
import IngredientDetail from '@/components/IngredientDetail'
import OrderSummary from '@/components/OrderSummary'
import OrderReview from '@/components/OrderReview'
import dishesData from '@/utils/data.json'

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('MAIN COURSE')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDishes, setSelectedDishes] = useState([])
  const [selectedDishForIngredient, setSelectedDishForIngredient] = useState(null)
  const [ingredientModalOpen, setIngredientModalOpen] = useState(false)
  const [orderReviewOpen, setOrderReviewOpen] = useState(false)

  const categories = ['STARTER', 'MAIN COURSE', 'DESSERT', 'CLASSIC']

  const filteredDishes = useMemo(() => {
    return dishesData.dishes.filter((dish) => {
      const matchesCategory = dish.mealType === selectedCategory
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const getCategoryCount = (category) => {
    return selectedDishes.filter(
      (id) => dishesData.dishes.find((d) => d.id === id)?.mealType === category
    ).length
  }

  const toggleDish = (dishId) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    )
  }

  const removeDish = (dishId) => {
    setSelectedDishes((prev) => prev.filter((id) => id !== dishId))
  }

  const totalPrice = useMemo(() => {
    return selectedDishes.reduce((sum, dishId) => {
      const dish = dishesData.dishes.find((d) => d.id === dishId)
      return sum + (dish?.price || 0)
    }, 0)
  }, [selectedDishes])

  const openIngredientModal = (dish) => {
    setSelectedDishForIngredient(dish)
    setIngredientModalOpen(true)
  }

  const handleContinueOrder = () => {
    setOrderReviewOpen(false)
    // Add your order confirmation logic here
    alert('Order confirmed! Thank you for your order.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-32">
      {/* Header with gradient */}
      <header className="sticky top-0 z-40 glass-effect border-b shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Party Menu
                </h1>
                <p className="text-sm text-muted-foreground hidden md:block">
                  Select your favorite dishes for the party
                </p>
              </div>
            </div>
            
            {selectedDishes.length > 0 && (
              <Badge className="bg-blue-600 text-white px-4 py-2 text-base animate-scale-in">
                <ShoppingBag className="h-4 w-4 mr-2" />
                {selectedDishes.length}
              </Badge>
            )}
          </div>

          {/* Search Bar */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Category Dropdown (Mobile Only) */}
          <div className="md:hidden mt-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-12 rounded-xl border-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat} {getCategoryCount(cat) > 0 && `(${getCategoryCount(cat)})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:inline-flex w-full justify-start mb-8 h-auto p-1.5 bg-muted/50 rounded-xl">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white px-6 py-3.5 rounded-lg font-medium transition-all data-[state=active]:shadow-lg"
              >
                {category.charAt(0) + category.slice(1).toLowerCase()}
                {getCategoryCount(category) > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-white/20 text-white border-0 hover:bg-white/30"
                  >
                    {getCategoryCount(category)}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dish Grid */}
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredDishes.length === 0 ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search' : 'No dishes available in this category'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredDishes.map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      isAdded={selectedDishes.includes(dish.id)}
                      onToggle={() => toggleDish(dish.id)}
                      onViewIngredients={() => openIngredientModal(dish)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Order Summary */}
      {selectedDishes.length > 0 && (
        <OrderSummary 
          selectedDishes={selectedDishes.length} 
          totalPrice={totalPrice}
          onReviewClick={() => setOrderReviewOpen(true)}
        />
      )}

      {/* Ingredient Detail */}
      <IngredientDetail
        dish={selectedDishForIngredient}
        open={ingredientModalOpen}
        onClose={() => setIngredientModalOpen(false)}
      />

      {/* Order Review Modal */}
      <OrderReview
        dishes={dishesData.dishes}
        selectedDishIds={selectedDishes}
        open={orderReviewOpen}
        onClose={() => setOrderReviewOpen(false)}
        onRemoveDish={removeDish}
        onContinue={handleContinueOrder}
      />
    </div>
  )
}
