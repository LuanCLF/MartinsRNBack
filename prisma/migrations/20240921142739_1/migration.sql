-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hosp" (
    "id" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "vacancy" INTEGER NOT NULL,
    "serviceArea" BOOLEAN NOT NULL,
    "kitchen" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Hosp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "delivery" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hosp_postId_key" ON "Hosp"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Food_postId_key" ON "Food"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hosp" ADD CONSTRAINT "Hosp_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
