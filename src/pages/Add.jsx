
import Card from '../components/Card';
import Account from '../components/Account';

function Add() {
  return (
		<div>
			<div className="flex flex-col justify-center">
				<h2 className="text-center font-bold my-4">Card</h2>
				<Card />
			</div>
			<div className="flex flex-col justify-center ">
				<h2 className="text-center font-bold my-4">Account</h2>
				<Account />
			</div>
		</div>
	);
}

export default Add