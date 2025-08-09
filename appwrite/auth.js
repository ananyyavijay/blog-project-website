import config from '../src/config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password); 
        } catch (error) {
            throw error;
            
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get(); //get acoount details
        } catch (error)
        {
            console.error("Appwrite service :: getCurrentUser :: error", error);
        }
        return null; // Return null if there's an error
    }

    async logout() {
        try {
            await this.account.deleteSessions();   //delete all sessions
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}


const authService = new AuthService();

export default authService;