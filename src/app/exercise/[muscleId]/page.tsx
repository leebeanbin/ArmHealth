import MassageGuideScreen from '@/app/components/ArmHealthApp/MassageGuideScreen';

interface PageProps {
  params: Promise<{ muscleId: string }>;
}

export default async function ExercisePage(props: PageProps) {
  const { muscleId } = await props.params;
  return <MassageGuideScreen muscleId={muscleId} />;
} 