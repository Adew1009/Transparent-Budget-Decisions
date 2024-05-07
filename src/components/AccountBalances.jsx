import React from "react";
import { Currency } from "lucide-react";

const AccountBalances = ({
  currentAccountBalance,
  accountList,
  accountNamesList,
}) => {
  // Function to determine the color based on the balance
  const getBalanceColor = (balance) => {
    return balance.includes("-") ? "red" : "green";
  };

  const debitBalance = currentAccountBalance("Debit");
  const savingsBalance = currentAccountBalance("Savings");
  const creditBalance = currentAccountBalance("Credit");

  return (
    <div
      className='w-full px-3 py-1 flex flex-row justify-evenly'

    >
      {debitAccounts.length > 0 ? (
        <div className=' text-center w-full m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-100 rounded shadow-sm'>
          <div className='progress-text w-full '>
            <h3 className="font-thin">Debit</h3>
            <h4 style={{ color: getBalanceColor(debitBalance) }}>
              {debitBalance}
            </h4>
          </div>
        </div>
      ) : null}
      {creditAccounts.length > 0 ? (
        <div className=' text-center w-full m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-100 rounded shadow-sm'>
          <div className='progress-text w-full'>
            <h3 className="font-thin">Credit</h3>
            <h4 style={{ color: getBalanceColor(creditBalance) }}>
              {creditBalance}
            </h4>
          </div>
        </div>
      ) : null}
      {savingsAccounts.length > 0 ? (
        <div className=' text-center w-full m-1 pt-2 pb-2 pl-4 pr-4 bg-slate-100 rounded shadow-sm'>
          <div className='progress-text w-full'>
            <h3 className="font-thin">Savings</h3>
            <h4 style={{ color: getBalanceColor(savingsBalance)}}>
              {savingsBalance}
            </h4>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AccountBalances;
