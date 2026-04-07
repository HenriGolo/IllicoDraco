package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository du Monstre
public interface MonstreRepository extends JpaRepository<Monstre,Integer> {

    Monstre save(Monstre monstre);
    
    Optional<Monstre> findById(Integer id);
    
    Collection<Monstre> findAll();
    
    Long count();

}