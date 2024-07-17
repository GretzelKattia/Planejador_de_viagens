import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ArrowRight,
  Calendar,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPin,
  Settings2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Button } from '../../../components/button'

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean
  closeGuestInput: () => void
  openGuestInput: () => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (date: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  closeGuestInput,
  isGuestInputOpen,
  openGuestInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null

  const today = new Date()

  return (
    <div className="bg-zinc-900 h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          onChange={(event) => setDestination(event.target.value)}
          disabled={isGuestInputOpen}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          placeholder="Para onde você vai?"
        />
      </div>

      <button
        disabled={isGuestInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left w-60"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className=" text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button onClick={closeGuestInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button type="button" onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker
              mode="range"
              locale={ptBR}
              showOutsideDays={true}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              disabled={{ before: today }}
              classNames={{
                months: 'flex flex-col sm:flex-row',
                month: 'space-y-2', // Espaçamento entre os meses
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'flex items-center',
                nav_button: 'h-8 w-8 hover:opacity-100 shadow-sm hover:bg-accent hover:text-black flex justify-center items-center rounded-xl', // Aumentei para rounded-xl
              
                nav_button_previous: 'absolute left-2',
                nav_button_next: 'absolute right-2',
              
                head_row: 'flex',
                head_cell: 'w-10 font-normal text-[0.9rem]',
                row: 'flex w-full mt-2 mb-2', // Espaçamento na parte superior e inferior das linhas
              
                cell: 'p-0',
              
                day: 'h-10 w-10 p-0 ease-in-out hover:rounded-xl hover:text-black aria-selected:bg-lime-300 aria-selected:text-lime-950 aria-selected:hover:rounded-none', // Aumentei para rounded-xl
              
                day_range_start: 'day-range-start rounded-l-xl aria-selected:hover:rounded-l-xl aria-selected:hover:bg-lime-500', // Aumentei para rounded-l-xl
                day_range_end: 'day-range-end rounded-r-xl aria-selected:hover:rounded-r-xl aria-selected:hover:bg-lime-500', // Aumentei para rounded-r-xl
              
                day_today: 'text-accent-foreground bg-zinc-950/95 rounded-xl aria-selected:rounded-r-none', // Aumentei para rounded-xl
              
                day_outside: 'day-outside text-muted-foreground opacity-50 aria-selected:opacity-100 aria-selected:bg-lime-300 aria-selected:text-lime-950',
                day_disabled: 'text-muted-foreground opacity-50',
              
                day_range_middle: 'aria-selected:bg-lime-300/90 rounded-none aria-selected:hover:bg-lime-500',
              }}
              
              components={{
                IconLeft: () => <ChevronLeftIcon className="size-5" />,
                IconRight: () => <ChevronRightIcon className="size-5" />,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}