export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Passionate full-stack developer from Nepal, currently studying at the National School of Sciences
                (2022-2025). I build platforms like GreenStayFinder and JobHunt, and believe in clean, efficient code
                and excellent user experience.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 2 years of freelance experience, I've delivered 10+ full-stack web projects for global
                clients, maintaining a 5-star rating while working with modern technologies like React, Next.js, and
                Node.js.
              </p>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">National School of Sciences</h4>
                  <p className="text-muted-foreground">Computer Science (2022-2025)</p>
                </div>
                <div>
                  <h4 className="font-medium">Little Step Academy</h4>
                  <p className="text-muted-foreground">Basic Education (2011-2022)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
