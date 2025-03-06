import { ComponentContainerCard } from '@/components'
import  LitePicker  from 'react-litepicker'
console.log(LitePicker);
const Calendar = () => {
	return (
		<ComponentContainerCard title="Calendar">
			<div className="dash-datepick">
				<LitePicker inlineMode={true} />
			</div>
		</ComponentContainerCard>
	)
}
export default Calendar
