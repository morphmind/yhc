import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import {
  Microscope,
  Shield,
  Heart,
  CheckCircle,
  Ruler,
  Clock,
  Star,
  Syringe,
} from 'lucide-react';

export function ContentSection() {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);
  const [hoveredTechnique, setHoveredTechnique] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'comparison'>('overview');

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Glowing Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Radial Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_100%_200px,rgba(59,130,246,0.1),transparent)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_800px_at_0%_800px,rgba(59,130,246,0.1),transparent)]" />
      </div>

      <div className="container relative z-10">
        {/* Section Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
              "border border-white/10",
              activeTab === 'overview'
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {t.microsapphire.overview.title}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
              "border border-white/10",
              activeTab === 'comparison'
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {t.microsapphire.comparison.title}
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
              {[
                {
                  id: 'precision',
                  icon: Ruler,
                  title: 'Ultra-precise incisions',
                  description: 'The micro sapphire blade makes the incisions much thinner and more precise.',
                  gradient: 'from-blue-500/20 to-cyan-500/20',
                  iconColor: 'text-blue-500',
                },
                {
                  id: 'healing',
                  icon: Clock,
                  title: 'Accelerated healing',
                  description: 'Smaller incisions heal faster, hurt less, and have a lower risk of infection.',
                  gradient: 'from-green-500/20 to-emerald-500/20',
                  iconColor: 'text-green-500',
                },
                {
                  id: 'protection',
                  icon: Shield,
                  title: '360° protection',
                  description: 'Sapphire DHI Implantation provides full protection for hair grafts during transplantation.',
                  gradient: 'from-purple-500/20 to-pink-500/20',
                  iconColor: 'text-purple-500',
                },
                {
                  id: 'density',
                  icon: Star,
                  title: 'Natural density',
                  description: '99% success rate of hair grafts means thicker hair and a natural-looking hairline.',
                  gradient: 'from-amber-500/20 to-orange-500/20',
                  iconColor: 'text-amber-500',
                },
              ].map((feature) => (
                <div
                  key={feature.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                      "bg-white/5 backdrop-blur-md",
                      "border border-white/10",
                      hoveredFeature === feature.id ? "scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "hover:scale-[1.01]"
                    )}
                  >
                    <div className="p-6 space-y-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          "bg-gradient-to-br",
                          feature.gradient
                        )}
                      >
                        <feature.icon
                          className={cn(
                            "w-6 h-6 transition-colors",
                            hoveredFeature === feature.id ? "text-white" : feature.iconColor
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {t.microsapphire.overview.features[feature.id as keyof typeof t.microsapphire.overview.features].title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {t.microsapphire.overview.features[feature.id as keyof typeof t.microsapphire.overview.features].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="space-y-16">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {t.microsapphire.process.title}
                </h2>
              </div>

              <div className="relative">
                {/* Process Timeline */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                <div className="grid gap-8 md:grid-cols-3 auto-rows-fr">
                  {t.microsapphire.process.steps.map((step, index) => (
                    <div
                      key={index}
                      className="group relative"
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      <div className={cn(
                        "relative p-6 rounded-2xl transition-all duration-300 h-full flex flex-col",
                        "bg-white/5 backdrop-blur-md border border-white/10",
                        hoveredStep === index ? "scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "hover:scale-[1.01]"
                      )}>
                        {/* Step Number */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white dark:bg-white dark:text-primary flex items-center justify-center font-bold text-lg shadow-lg z-10">
                          {index + 1}
                        </div>

                        {/* Step Content */}
                        <div className="relative pt-8 space-y-4 flex-1 flex flex-col">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center",
                            "bg-gradient-to-br",
                            index === 0 ? "from-emerald-500/20 to-green-500/20" :
                            index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                            "from-purple-500/20 to-pink-500/20"
                          )}>
                            {index === 0 ? <Microscope className="w-6 h-6 text-white" /> :
                             index === 1 ? <Syringe className="w-6 h-6 text-white" /> :
                             <Heart className="w-6 h-6 text-white" />}
                          </div>

                          <div className="relative flex-1 flex flex-col">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'comparison' && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Traditional Methods */}
            <div
              className="group relative"
              onMouseEnter={() => setHoveredTechnique('traditional')}
              onMouseLeave={() => setHoveredTechnique(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/5 backdrop-blur-md",
                  "border border-white/10",
                  hoveredTechnique === 'traditional' ? "scale-[1.02] shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "hover:scale-[1.01]"
                )}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                      <Syringe className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {t.microsapphire.comparison.traditional.title}
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {t.microsapphire.comparison.traditional.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Micro Sapphire DHI */}
            <div
              className="group relative"
              onMouseEnter={() => setHoveredTechnique('microsapphire')}
              onMouseLeave={() => setHoveredTechnique(null)}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/5 backdrop-blur-md",
                  "border border-white/10",
                  hoveredTechnique === 'microsapphire' ? "scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "hover:scale-[1.01]"
                )}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Microscope className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {t.microsapphire.comparison.microsapphire.title}
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {t.microsapphire.comparison.microsapphire.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}