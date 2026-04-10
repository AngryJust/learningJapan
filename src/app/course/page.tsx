import CourseMap from "@/components/course/CourseMap";

export default function CoursePage() {
  return (
    <div>
      <div className="mb-8 animate-fade-in-up">
        <h1 className="font-[var(--font-display)] text-3xl font-bold tracking-tight">Карта курса</h1>
        <p className="text-muted text-sm mt-2">
          Завершите каждый день, чтобы открыть следующий
        </p>
        <div className="brush-line w-16 mt-4" />
      </div>
      <CourseMap />
    </div>
  );
}
