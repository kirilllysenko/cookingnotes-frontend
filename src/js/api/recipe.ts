import fetcher from "../util/APIUtil";
import {Category, Unit} from "./auth";

export type RecipeRequest = {
    id: number | null;
    title: string;
    description: string;
    image: string;
    imagePreview: string;
    cookTime: number;
    prepareTime: number;
    isStepsWithImage: boolean;
    portions: number;
    categories: number[];
    ingredients: Ingredient[];
    steps: Step[];
}

export type RecipeResponse = Omit<RecipeRequest, "categories"> & {
    userName: string;
    userId: number;
    userAvatar: string;
    rating: number;
    categories: Category[];
    isStepsWithImage: boolean;
    isFavourite: boolean;
    isMadeIt: boolean;
    date: Date
    userComment: CommentResponse | null;
}

export interface CommentResponse {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    text: string;
    rating: number;
    date: Date;
}

export interface CommentRequest {
    recipeId: number;
    text: string;
    rating: number;
}

export type Ingredient = {
    name: string;
    amount: number;
    unit: number;
}

export type Step = {
    text: string;
    image: string;
}

export type RecipePreviewResponse = {
    id: number;
    rating: number;
    imagePreview: string;
    title: string;
}

export interface InitResponse {
    categories: Category[];
    units: Unit[];
}

export interface RecipeCarouselResponse {
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface HomeResponse {
    officialRecipes: RecipeCarouselResponse[];
    bestRecipes: RecipePreviewResponse[];
}

export const addRecipe = async (recipe: RecipeRequest): Promise<void> => fetcher.post("/recipe", recipe);

export const getRecipe = async (id: number | string): Promise<RecipeResponse> => fetcher.get(`/recipe/${id}`);

export const toggleFavourites = async (id: number | string): Promise<void> => fetcher.get(`/recipe/${id}/toggleFavourites`);

export const toggleMadeIt = async (id: number | string): Promise<void> => fetcher.get(`/recipe/${id}/toggleMadeIt`);

export const deleteRecipe = async (id: number | string): Promise<void> => fetcher.delete(`/recipe/${id}`);

export const editRecipe = async (id: number, recipe: RecipeRequest): Promise<void> => fetcher.put(`/recipe/${id}`, recipe);

export const deleteComment = async (recipeId: number | string, commentId: number | string): Promise<void> =>
    fetcher.delete(`/recipe/${recipeId}/comments/${commentId}`);

export const getRating = async (id: number | string): Promise<number> => fetcher.get(`/recipe/${id}/rating`);

export const addComment = async (recipeId: number | string, comment: CommentRequest): Promise<CommentResponse> =>
    fetcher.post(`/recipe/${recipeId}/comments`, comment);

export const editComment = async (recipeId: number | string, commentId: number | string, comment: CommentRequest): Promise<void> =>
    fetcher.put(`/recipe/${recipeId}/comments/${commentId}`, comment);

export const getComments = async (id: number | string, page: number, size: number): Promise<CommentResponse[]> =>
    fetcher.get(`/recipe/${id}/comments`, {page, size});

export const start = async (): Promise<InitResponse> => fetcher.get("/recipe/start");

export const home = async (): Promise<HomeResponse> => fetcher.get("/recipe/initialRecipes");