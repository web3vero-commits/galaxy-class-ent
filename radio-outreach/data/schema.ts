export type StationStatus = "UNVERIFIED" | "VERIFIED" | "ACTIVE" | "NO_CONTACT" | "DNC" | "SUBMITTED";
export type CallResult = "ANSWERED" | "VOICEMAIL" | "NO_ANSWER" | "WRONG_NUMBER" | "CALLBACK_REQUESTED" | "SUBMITTED_MUSIC" | "REJECTED" | "GATEKEEPER";

export interface Station {
  call_letters: string;
  station_name: string;
  frequency: string;
  format: string;
  market_city: string;
  market_state: string;
  market_rank: number | null;

  phone_main: string;
  phone_direct: string;
  contact_name: string;
  contact_title: string;       // "Music Director" | "Program Director" | "Promotions Dir"
  contact_email: string;

  best_call_days: string;      // "Monday,Tuesday" etc
  best_call_time_start: string; // "10:00"
  best_call_time_end: string;   // "11:30"
  timezone: string;             // "ET" | "CT"

  last_called: string;          // ISO date
  last_result: CallResult | "";
  follow_up_date: string;       // ISO date
  status: StationStatus;
  notes: string;
  verified_date: string;
  source: string;
}

export interface CallLog {
  id: string;
  call_letters: string;
  date: string;                // ISO datetime
  caller: string;              // "MikeZ" | "Agent"
  contact_reached: string;
  result: CallResult;
  notes: string;
  follow_up: string;
}
