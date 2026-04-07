package illicodraco.project.repositories;

import illicodraco.project.beans.*;
import java.util.Optional;
import java.util.Collection;

// Interface java gérant le repository des Outils
public interface OutilRepository extends JpaRepository<Outil,Integer> {

    Outil save(Outil outil);
    
    Optional<Outil> findById(Integer id);
    
    Collection<Outil> findAll();
    
    Long count();

}