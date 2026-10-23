import { Cpu, Hexagon, Lightbulb, ShieldCheck, Tags } from 'lucide-react'
import type { PanelIcon } from '../content/content'

export const panelIcons: Record<PanelIcon, typeof Cpu> = {
  shield: ShieldCheck, tags: Tags, cpu: Cpu, lightbulb: Lightbulb, hexagon: Hexagon,
}

// Screen-space layout (NDC x, y, depth in metres) for wide screens, in content order.
// The DOM places each panel at its NDC point; the tracker below adds the parallax drift
// of a point at that depth, so panels feel suspended in the scene.
export const panelLayout: [number, number, number][] = [
  [-0.02, 0.56, 7.5], // Data Governance: open sky right of the headline
  [-0.05, 0.0, 6.0], // Metadata: over the left skyline, clear of the text column
  [0.38, 0.68, 9.0], // Data & AI: between figure and landmark crown
  [0.78, 0.22, 7.0], // Product Innovation: right of the district
  [0.52, -0.26, 5.5], // DGNA: over the city, right of the figure
]
