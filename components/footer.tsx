export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground text-sm">
              BP
            </div>
            <span className="font-semibold">Bishwas Pandey</span>
          </div>

          <p className="text-muted-foreground text-sm">© 2025 Bishwas Pandey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
