export function Spinner() {
	return (
		<div className='inline-block w-[50px] h-[50px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='block absolute w-[40px] h-[40px] m-[5px] border-[4px] border-[#ccc] rounded-full border-t-[#007bff] animate-spin'></div>
		</div>
	);
}
