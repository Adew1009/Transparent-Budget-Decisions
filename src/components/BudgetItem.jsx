import React from "react";
import { Currency } from "lucide-react";
import { Card, ProgressBar, ProgressCircle } from "@tremor/react";

const BudgetItem = ({ budgetList, accountList }) => {
  const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });
  };

  const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 0,
    });
  };

  function budgetSpent(category) {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      accountList.forEach((transaction) => {
        if (transaction.selectBudget === category) {
          if (transaction.newTransactionType === "Withdrawal") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
          }
        }
      });
    }
    let recordedBalance = totalDeposits + totalWithdrawals;
    return recordedBalance;
  }

  return (
    <>
      <div className='overflow-x-scroll w-full flex items-center justify-center'>
        {budgetList.map((budget) => {
          const spent = budgetSpent(budget.newBudget);
          const remaining = budget.newBudgetAmount - spent;
          const percentageSpent = (spent / budget.newBudgetAmount) * 100;

          return (
            <div
              className='m-1 h-max w-full rounded text-center'
              key={budget.newBudget}
            >
              <div className='h-max shadow rounded text-white'>
                <Card className='shadow h-full flex flex-col justify-center items-center bg-slate-500'>
                  <h4 className='bg-slate-700 px-2 py-1 text-xl font-light shadow-inner flex justify-center items-center w-full h-max overflow-hidden rounded '>
                    {budget.newBudget}
                  </h4>
                  <p className='text-md flex justify-center'>
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(spent)}{" "}
                    /{" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(budget.newBudgetAmount)}
                  </p>
                  {/* <small className='flex justify-center text-lg font-medium'>
                    {formatPercentage(percentageSpent / 100)}
                  </small>

                  
                    <ProgressBar
                      showAnimation
                      max={budget.newBudgetAmount}
                      value={percentageSpent}
                      color='teal'
                      
                    /> */}
                  <ProgressCircle
                    showAnimation
                    max={budget.newBudgetAmount}
                    value={percentageSpent}
                    color='green'
                  >
                    <span className='text-md font-medium text-slate-700'>
                      {Math.round(percentageSpent)}%
                    </span>
                  </ProgressCircle>

                  <span className="text-md">
                    Remaining:{" "}
                    <span className='text-green-500'>
                      {formatCurrency(remaining)}
                    </span>
                  </span>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BudgetItem;
