import { useEffect, useState } from 'react'

export default function Timer({ minutes, onExpire }) {
  const [seconds, setSeconds] = useState(minutes * 60)
  useEffect(() => { const timer = setInterval(() => setSeconds((value) => { if (value <= 1) { clearInterval(timer); onExpire(); return 0 } return value - 1 }), 1000); return () => clearInterval(timer) }, [onExpire])
  return <div className={`timer ${seconds < 60 ? 'urgent' : ''}`}><span>◷</span> {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
}