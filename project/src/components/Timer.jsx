import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export function Timer({ timeRemaining, onTimeUp }) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <TimerIcon className="w-5 h-5 text-blue-600" />
      <span>{timeRemaining}s</span>
    </div>
  );
}