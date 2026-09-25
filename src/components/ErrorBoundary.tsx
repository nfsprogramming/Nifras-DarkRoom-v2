import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-[#8a8a8a]">
          SYSTEM FAULT — RELOAD THE ROOM
        </div>
      );
    }
    return this.props.children;
  }
}
