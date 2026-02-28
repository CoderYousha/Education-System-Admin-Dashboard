import Wallet from "../pages/wallet/Wallet";

function WalletRoutes (){
    return [
        {
            'path': '/wallet',
            'element': <Wallet />
        },
    ];
}

export default WalletRoutes;