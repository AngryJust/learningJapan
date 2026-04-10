"use client";

import { useState, useMemo, useCallback } from "react";
import { ExerciseQuestion } from "@/lib/exercises";
import MultipleChoice from "./MultipleChoice";
import MatchingPairs from "./MatchingPairs";
import TypeAnswer from "./TypeAnswer";
import FillInBlank from "./FillInBlank";
import DragReorder from "./DragReorder";
import ListenChoose from "./ListenChoose";
import ListenType from "./ListenType";
import ReverseChoice from "./ReverseChoice";

const typeLabels: Record<string, string> = {
  "multiple-choice": "выбор ответа",
  "matching-pairs": "найди пару",
  "type-answer": "ввод ответа",
  "fill-in-blank": "заполни пропуск",
  "drag-reorder": "порядок слов",
  "listen-choose": "аудирование",
  "listen-type": "диктант",
  "reverse-choice": "перевод",
};

interface MistakeInfo {
  itemKey: string;
  puzzleType: string;
  userAnswer: string;
  correctAnswer: string;
  prompt: string;
}

interface Props {
  questions: ExerciseQuestion[];
  onComplete: (correct: number, total: number) => void;
  onMistake?: (info: MistakeInfo) => void;
}

export default function ExerciseRunner({ questions, onComplete, onMistake }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [mcSelected, setMcSelected] = useState<string | null>(null);
  const [fibSelected, setFibSelected] = useState<string | null>(null);
  const [lcSelected, setLcSelected] = useState<string | null>(null);
  const [rcSelected, setRcSelected] = useState<string | null>(null);

  const current = useMemo(() => questions[currentIdx], [questions, currentIdx]);
  const total = questions.length;
  const progress = total > 0 ? ((currentIdx + 1) / total) * 100 : 0;

  // Central handler: all components call this with (correct, userAnswer?)
  const handleAnswer = useCallback(
    (correct: boolean, userAnswer?: string) => {
      if (correct) {
        setCorrectCount((c) => c + 1);
      } else if (userAnswer && onMistake && current) {
        // Track the mistake
        const q = current;
        let itemKey = "";
        let correctAnswer = "";
        let prompt = "";

        if (q.type === "multiple-choice") { itemKey = `item:${q.prompt}`; correctAnswer = q.correct; prompt = q.prompt; }
        else if (q.type === "type-answer") { itemKey = `item:${q.prompt}`; correctAnswer = q.acceptedAnswers[0]; prompt = q.prompt; }
        else if (q.type === "fill-in-blank") { itemKey = `item:${q.correct}`; correctAnswer = q.correct; prompt = `${q.before}___${q.after}`; }
        else if (q.type === "listen-choose") { itemKey = `item:${q.audioText}`; correctAnswer = q.correct; prompt = q.audioText; }
        else if (q.type === "listen-type") { itemKey = `item:${q.audioText}`; correctAnswer = q.acceptedAnswers[0]; prompt = q.audioText; }
        else if (q.type === "reverse-choice") { itemKey = `item:${q.correct}`; correctAnswer = q.correct; prompt = q.prompt; }
        else if (q.type === "drag-reorder") { itemKey = `item:${q.instruction}`; correctAnswer = q.correctOrder.join(" "); prompt = q.instruction; }
        else if (q.type === "matching-pairs") { itemKey = `item:${q.pairs.map(p => p[0]).join(",")}`; correctAnswer = q.pairs.map(p => `${p[0]}=${p[1]}`).join(", "); prompt = "matching"; }

        if (itemKey) {
          onMistake({ itemKey, puzzleType: q.type, userAnswer, correctAnswer, prompt });
        }
      }
      setAnswered(true);
    },
    [onMistake, current]
  );

  function handleNext() {
    if (currentIdx + 1 >= total) {
      onComplete(correctCount, total);
    } else {
      setCurrentIdx((i) => i + 1);
      setAnswered(false);
      setMcSelected(null);
      setFibSelected(null);
      setLcSelected(null);
      setRcSelected(null);
    }
  }

  if (!current) return null;

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-muted">{currentIdx + 1} / {total}</span>
        <span className="text-accent font-semibold">{correctCount} правильно</span>
      </div>
      <div className="w-full bg-surface rounded-full h-1.5 mb-6 overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`Прогресс: ${currentIdx + 1} из ${total}`}>
        <div
          className="bg-accent h-1.5 rounded-full transition-all duration-500 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 progress-shimmer rounded-full" />
        </div>
      </div>

      {/* Type badge */}
      <div className="mb-5">
        <span className="text-[10px] bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium tracking-wide uppercase">
          {typeLabels[current.type] || current.type}
        </span>
      </div>

      {/* Question */}
      <div className="animate-fade-in" key={currentIdx}>
        {current.type === "multiple-choice" && (
          <MultipleChoice question={current} onAnswer={handleAnswer} selected={mcSelected} onSelect={setMcSelected} />
        )}
        {current.type === "matching-pairs" && (
          <MatchingPairs question={current} onAnswer={(c) => handleAnswer(c)} />
        )}
        {current.type === "type-answer" && (
          <TypeAnswer question={current} onAnswer={handleAnswer} />
        )}
        {current.type === "fill-in-blank" && (
          <FillInBlank question={current} onAnswer={handleAnswer} selected={fibSelected} onSelect={setFibSelected} />
        )}
        {current.type === "drag-reorder" && (
          <DragReorder question={current} onAnswer={handleAnswer} />
        )}
        {current.type === "listen-choose" && (
          <ListenChoose question={current} onAnswer={handleAnswer} selected={lcSelected} onSelect={setLcSelected} />
        )}
        {current.type === "listen-type" && (
          <ListenType question={current} onAnswer={handleAnswer} />
        )}
        {current.type === "reverse-choice" && (
          <ReverseChoice question={current} onAnswer={handleAnswer} selected={rcSelected} onSelect={setRcSelected} />
        )}
      </div>

      {/* Next */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full mt-6 bg-accent text-white rounded-xl py-3 font-semibold hover:bg-accent-hover transition-colors animate-fade-in-up"
        >
          {currentIdx + 1 >= total ? "Результаты" : "Далее"}
        </button>
      )}
    </div>
  );
}
