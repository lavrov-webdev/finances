/*
  Warnings:

  - Added the required column `startSum` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isWaste" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("createdAt", "id", "isActive", "name", "updatedAt", "userId") SELECT "createdAt", "id", "isActive", "name", "updatedAt", "userId" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_userId_key" ON "Category"("name", "userId");
CREATE TABLE "new_Sprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "startSum" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Sprint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Sprint" ("createdAt", "endDate", "id", "startDate", "updatedAt", "userId") SELECT "createdAt", "endDate", "id", "startDate", "updatedAt", "userId" FROM "Sprint";
DROP TABLE "Sprint";
ALTER TABLE "new_Sprint" RENAME TO "Sprint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
