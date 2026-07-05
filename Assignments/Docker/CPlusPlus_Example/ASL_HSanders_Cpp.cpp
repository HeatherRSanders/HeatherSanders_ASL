#include <iostream>
#include <ctime>

int main()
{
   std::time_t timestamp;
   time(&timestamp);


    std::cout << "Current Date and Time: " << std::ctime(&timestamp)
              << "Hello ASL!"
              << std::endl;
              
}