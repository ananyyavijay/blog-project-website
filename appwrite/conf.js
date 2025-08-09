import {Client, ID, Databases, Query} from 'appwrite';
import config from '../src/config/config';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, featuredImage, content, userId, status}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    featuredImage,
                    content,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log("error", error);
        }
    };

    async updatePost(slug, {title, featuredImage, content, userId, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                 slug,
                 {
                    title,
                    featuredImage,
                    content,
                    status,
                 }
            )
        } catch (error) {
         console.log("error", error);   
        }
    };

    async deletePost({slug}) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            )
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    async getPostBySlug(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log("error", error);
            return false;   
        }
    };

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };
 
    //file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    getFilePreview(fileId) {
        try {
            config.appwriteBucketID,
            fileId
        } catch (error) {
            console.log("error", error);
        }
    };

}

const service = new Service();
export default service;


