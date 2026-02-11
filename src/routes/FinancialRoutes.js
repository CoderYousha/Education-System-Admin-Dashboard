import Financial from "../pages/financial/Financial";
import FinancialOperations from "../pages/financial/FinancialOperations";
import ProfitWithdrawalRequests from "../pages/financial/ProfitWithdrawalRequests";

function FinancialRoutes () {
    return [
        {
            path: '/financial',
            element: <Financial />
        },
        {
            path: '/financial/withdrawal-requests',
            element: <ProfitWithdrawalRequests />
        },
        {
            path: '/financial/financial-operations',
            element: <FinancialOperations />
        },
    ];
}

export default FinancialRoutes;