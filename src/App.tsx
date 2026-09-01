import { useEffect, useRef, useState } from "react";
import { createEmptyMeetingData, MeetingData, SendStatus, StepId, STEP_IDS } from "@/types/meeting";
import { loadDraft, saveDraft, saveMeetingToDatabase } from "@/services/storageService";
import { sendMeetingSummary } from "@/services/emailService";

import Navigation from "@/components/layout/Navigation";
import Cover from "@/pages/Cover";
import MeetingInfo from "@/pages/MeetingInfo";
import Block1Business from "@/pages/Block1Business";
import Block2Clients from "@/pages/Block2Clients";
import Block3Acquisition from "@/pages/Block3Acquisition";
import Block4SocialMedia from "@/pages/Block4SocialMedia";
import Block5Website from "@/pages/Block5Website";
import Block6Competition from "@/pages/Block6Competition";
import Block7Objectives from "@/pages/Block7Objectives";
import Summary from "@/pages/Summary";

// Primer índice de STEP_IDS que aparece en la barra de navegación (business = 01).
const NAV_OFFSET = STEP_IDS.indexOf("business");

export default function App() {
  const [data, setData] = useState<MeetingData>(() => loadDraft() ?? createEmptyMeetingData());
  const [stepIndex, setStepIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendMessage, setSendMessage] = useState<string | null>(null);
  const hasLoadedDraft = useRef(false);

  // Autoguardado: nada se pierde si se recarga la pestaña durante la reunión.
  useEffect(() => {
    if (!hasLoadedDraft.current) {
      hasLoadedDraft.current = true;
      return;
    }
    saveDraft(data);
  }, [data]);

  const currentStepId = STEP_IDS[stepIndex] as StepId;

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(STEP_IDS.length - 1, index));
    setStepIndex(clamped);
    setFurthestIndex((f) => Math.max(f, clamped));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStepId = (id: StepId) => goTo(STEP_IDS.indexOf(id));
  const goNext = () => goTo(stepIndex + 1);
  const goBack = () => goTo(stepIndex - 1);

  const handleSend = async () => {
    setSendStatus("saving");
    setSendMessage(null);
    try {
      await saveMeetingToDatabase(data);
      const result = await sendMeetingSummary(data);
      setSendStatus(result.success ? "sent" : "error");
      setSendMessage(result.message);
    } catch (error) {
      setSendStatus("error");
      setSendMessage(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.");
    }
  };

  const showNav = currentStepId !== "cover";
  const navFurthest = Math.max(-1, furthestIndex - NAV_OFFSET);

  return (
    <div className="min-h-screen bg-ink-50">
      {showNav && (
        <Navigation currentStepId={currentStepId} furthestIndex={navFurthest} onNavigate={goToStepId} />
      )}

      {currentStepId === "cover" && (
        <Cover
          date={data.meetingInfo.date}
          attendees={data.meetingInfo.attendees}
          onDateChange={(v) => setData((d) => ({ ...d, meetingInfo: { ...d.meetingInfo, date: v } }))}
          onAttendeesChange={(v) => setData((d) => ({ ...d, meetingInfo: { ...d.meetingInfo, attendees: v } }))}
          onStart={goNext}
        />
      )}

      {currentStepId === "meetingInfo" && (
        <MeetingInfo
          data={data.meetingInfo}
          onChange={(v) => setData((d) => ({ ...d, meetingInfo: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "business" && (
        <Block1Business
          data={data.business}
          onChange={(v) => setData((d) => ({ ...d, business: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "clients" && (
        <Block2Clients
          data={data.clients}
          onChange={(v) => setData((d) => ({ ...d, clients: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "acquisition" && (
        <Block3Acquisition
          data={data.acquisition}
          onChange={(v) => setData((d) => ({ ...d, acquisition: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "socialMedia" && (
        <Block4SocialMedia
          data={data.socialMedia}
          onChange={(v) => setData((d) => ({ ...d, socialMedia: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "website" && (
        <Block5Website
          data={data.website}
          onChange={(v) => setData((d) => ({ ...d, website: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "competition" && (
        <Block6Competition
          data={data.competition}
          onChange={(v) => setData((d) => ({ ...d, competition: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "objectives" && (
        <Block7Objectives
          data={data.objectives}
          onChange={(v) => setData((d) => ({ ...d, objectives: v }))}
          onBack={goBack}
          onContinue={goNext}
        />
      )}

      {currentStepId === "summary" && (
        <Summary
          data={data}
          onChange={setData}
          onBack={goBack}
          onSend={handleSend}
          sendStatus={sendStatus}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}
