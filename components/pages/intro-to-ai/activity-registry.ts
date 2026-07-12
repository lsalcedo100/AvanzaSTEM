import { createElement, type ReactNode } from "react"
import type { ActivityDefinition, ActivityKind } from "@/features/curriculums/intro-to-ai-types"
import type { useIntroToAiProgress } from "@/components/ui/useIntroToAiProgress"
import { AiDetectiveActivity } from "@/components/pages/intro-to-ai/activities/ai-detective"
import { RuleBuilderActivity } from "@/components/pages/intro-to-ai/activities/rule-builder"
import { DeviceInvestigationActivity } from "@/components/pages/intro-to-ai/activities/device-investigation"
import { DatasetWorkspaceActivity } from "@/components/pages/intro-to-ai/activities/dataset-workspace"
import { TrainTestSplitActivity } from "@/components/pages/intro-to-ai/activities/train-test-split"
import { DatasetRepairActivity } from "@/components/pages/intro-to-ai/activities/dataset-repair"
import { ClassifierWalkthroughActivity } from "@/components/pages/intro-to-ai/activities/image-classifier-walkthrough"
import { ImageClassifierLabActivity } from "@/components/pages/intro-to-ai/activities/image-classifier-lab"
import { ConfuseImproveActivity } from "@/components/pages/intro-to-ai/activities/confuse-improve"
import { ChatbotBuilderActivity } from "@/components/pages/intro-to-ai/activities/chatbot-builder"
import { TextPredictionActivity } from "@/components/pages/intro-to-ai/activities/text-prediction"
import { RecommendationBuilderActivity } from "@/components/pages/intro-to-ai/activities/recommendation-builder"
import { FairnessAuditActivity } from "@/components/pages/intro-to-ai/activities/fairness-audit"
import { PrivacyMinimizeActivity } from "@/components/pages/intro-to-ai/activities/privacy-minimize"
import { ContentEthicsActivity } from "@/components/pages/intro-to-ai/activities/content-ethics"

/**
 * Registry that maps an activity `kind` to the real, deterministic component that
 * implements it. Components are registered here ONLY once they perform real work
 * (using ActivityFrame + the progress hook). It is intentionally empty for now:
 * every activity renders its briefing, so nothing pretends to compute.
 *
 * `getActivityComponent` returns null for any unregistered or unknown kind, so
 * the lesson renderer always has a safe fallback (the briefing).
 */
export type ActivityComponentProps = {
  activity: ActivityDefinition
  progress: ReturnType<typeof useIntroToAiProgress>
}

export type ActivityComponent = (props: ActivityComponentProps) => ReactNode

const REGISTRY: Partial<Record<ActivityKind, ActivityComponent>> = {
  // Week 1 — real, deterministic activities.
  "ai-detective": AiDetectiveActivity,
  "rule-builder": RuleBuilderActivity,
  "device-investigation": DeviceInvestigationActivity,
  // Week 2 — the data lab (space-fruit dataset + transparent kNN model).
  "feature-labeling": DatasetWorkspaceActivity,
  "train-test-split": TrainTestSplitActivity,
  "dataset-repair": DatasetRepairActivity,
  // Week 3 — the image-recognition lab (generated pixel images + feature kNN).
  "classifier-walkthrough": ClassifierWalkthroughActivity,
  "train-test-classifier": ImageClassifierLabActivity,
  "confusion-improve": ConfuseImproveActivity,
  // Week 4 — chatbot builder, next-text prediction, recommendation builder.
  "rule-chatbot": ChatbotBuilderActivity,
  "next-text-prediction": TextPredictionActivity,
  "recommendation-audit": RecommendationBuilderActivity,
  // Week 5 — fairness audit, privacy lab, content investigation + ethics + appeal.
  "fairness-audit": FairnessAuditActivity,
  "privacy-minimize": PrivacyMinimizeActivity,
  "content-investigation": ContentEthicsActivity,
  // Later phases register the remaining kinds.
}

export function getActivityComponent(kind: string): ActivityComponent | null {
  return REGISTRY[kind as ActivityKind] ?? null
}

export function isActivityInteractive(kind: string): boolean {
  return getActivityComponent(kind) !== null
}

/**
 * Renders the registered interactive activity as a React element, or returns null
 * if the kind has no real component yet (the caller then shows the briefing).
 * Using `createElement` here keeps the dynamic component out of JSX in the lesson
 * renderer.
 */
export function renderActivity(props: ActivityComponentProps): ReactNode {
  const Component = getActivityComponent(props.activity.kind)
  return Component ? createElement(Component, props) : null
}
